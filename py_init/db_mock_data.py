import json
import re
import string
from tqdm import tqdm
from sqlalchemy import *
from faker import Faker
from random import shuffle, choices, random
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from itertools import product, islice

# db drivers
import psycopg2

Base = declarative_base()
fake = Faker()
Faker.seed(42)


def unique_combinations(fields, created_data, limit):
    combination_lists = []
    lists_names = []
    for field_name, field_type in fields.items():
        if "FK" in field_type:
            foreign_table, foreign_key = field_type.split(' ')[1].split('.')
            combination_lists.append([x.id for x in created_data[foreign_table]])
            lists_names.append(field_name)

    for list in combination_lists:
        shuffle(list)

    # generate combinations
    combinations = islice(product(*combination_lists), limit)

    return combinations, lists_names


class EmailGenerator:
    def __init__(self):
        self.existing_emails = set()

    def generate_random_email(self, unique=False):
        while True:
            local_part = ''.join(
                choices(string.ascii_uppercase, k=1) + choices(string.ascii_lowercase + string.digits, k=10))
            domain = ''.join(choices(string.ascii_lowercase, k=6))
            email = f"{local_part}@{domain}.com"
            if not unique or email not in self.existing_emails:
                self.existing_emails.add(email)
                return email


email_generator = EmailGenerator()


def create_model(name, fields, intermediary_table):
    attrs = {'__tablename__': name.lower()}
    for field_name, field_type_original in fields.items():
        field_type = field_type_original
        is_unique = False
        if "UNIQUE" in field_type:
            is_unique = True
            field_type = field_type_original.strip('UNIQUE').strip()
        if "PK serial" in field_type:
            attrs[field_name] = Column(Integer, primary_key=True, autoincrement=True)
        elif any(x in field_type for x in ["first_name", "last_name", "email", "password", "address", "phone", "long_text", "OPTION IN"]):
            attrs[field_name] = Column(String, unique=is_unique)
        elif "timestamp" in field_type:
            attrs[field_name] = Column(TIMESTAMP, unique=is_unique)
        elif "bool" in field_type:
            attrs[field_name] = Column(BOOLEAN, unique=is_unique)
        elif "integer" in field_type:
            attrs[field_name] = Column(INTEGER, unique=is_unique)
        elif "float" in field_type:
            attrs[field_name] = Column(FLOAT, unique=is_unique)
        elif field_type.startswith("FK"):
            ref_table, ref_column = field_type.split()[1].split('.')
            attrs[field_name] = Column(Integer, ForeignKey(f"{ref_table.lower()}.{ref_column}"),
                                       primary_key=intermediary_table)
        else:
            raise ValueError(f"Unknown field type: {field_type}")

    return type(name, (Base,), attrs)


def create_random_model_object(model, fields, existing_objects, self_referential=False):
    field_data = {}
    for field_name, field_type_original in fields.items():
        field_type = field_type_original
        is_unique = False
        const = False
        if "UNIQUE" in field_type:
            is_unique = True
            field_type = field_type_original.split('UNIQUE')[0].strip()
        if "CONST" in field_type:
            const = True
            const_value = field_type_original.split('CONST')[-1].strip()
            if const_value == "None": const_value = None
        if "PK serial" in field_type:
            continue
        elif "bool" in field_type:
            field_data[field_name] = const_value if const else fake.random_element([True, False])
        elif "integer" in field_type:
            field_data[field_name] = const_value if const else fake.random_int()
        elif "float" in field_type:
            field_data[field_name] = const_value if const else random() * 1000
        elif "first_name" in field_type:
            field_data[field_name] = const_value if const else fake.first_name()
        elif "last_name" in field_type:
            field_data[field_name] = const_value if const else fake.last_name()
        elif "email" in field_type:
            field_data[field_name] = const_value if const else email_generator.generate_random_email(is_unique)
        elif "password" in field_type:
            field_data[field_name] = const_value if const else fake.password()
        elif "address" in field_type:
            field_data[field_name] = const_value if const else fake.address()
        elif "timestamp" in field_type:
            field_data[field_name] = const_value if const else fake.date_time()
        elif "phone" in field_type:
            field_data[field_name] = const_value if const else fake.phone_number()
        elif "long_text" in field_type:
            field_data[field_name] = const_value if const else fake.paragraph()
        elif "OPTION IN" in field_type:
            options = field_type.split('(')[1].strip(')').split(', ')
            field_data[field_name] = fake.random_element(elements=options)
        elif "FK" in field_type:
            foreign_table, foreign_key = field_type.split(' ')[1].split('.')
            if foreign_table == table_name and not self_referential:
                field_data[field_name] = None
            else:
                get_data = getattr(fake.random_element(existing_objects[foreign_table]), foreign_key)
                field_data[field_name] = get_data
        else:
            raise ValueError(f"Unknown field type: {field_type}")

    return model(**field_data)


# load json
with open('mockdata.json', 'r') as f:
    json_data = json.load(f)

engine = create_engine(json_data['connection'])
objects_counts = {}
for table_name in json_data['objects_count']:
    objects_counts[table_name] = json_data['objects_count'][table_name]

# while loop for generating data
tables = {}
models = {}
special_tables = {}
pbar = tqdm([x for x in json_data['tables']])
for table in pbar:
    table_name = table
    intermediary_table = False
    if len(table.split(' ')) > 1:
        table_name = table.split(' ')[1]
        special_tables[table.split(' ')[1]] = table.split(' ')[0]
        if table.split(' ')[0] == 'IntermediaryTable:':
            intermediary_table = True
    tables[table_name] = json_data['tables'][table]
    models[table_name] = create_model(table_name, json_data['tables'][table], intermediary_table=intermediary_table)

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine, autoflush=True)
session = Session()

new_objects = {}
pbar = tqdm([x for x in objects_counts])
for table_name in pbar:
    pbar.set_description(f"Processing {table_name}")
    # generate objects
    if table_name in special_tables:
        if 'IntermediaryTable:' in special_tables[table_name]:
            continue
        if re.match(r'SelfReferential\((\d+)%\):', special_tables[table_name]):
            percentage = float(re.match(r'SelfReferential\((\d+)%\):', special_tables[table_name]).group(1))
            for i in range(round(objects_counts[table_name] * (100 - percentage) / 100)):
                new_obj = create_random_model_object(models[table_name], tables[table_name], new_objects,
                                                     self_referential=False)
                if table_name not in new_objects:
                    new_objects[table_name] = [new_obj]
                else:
                    new_objects[table_name].append(new_obj)
                session.add(new_obj)
            for _ in range(round(objects_counts[table_name] * percentage / 100)):
                new_obj = create_random_model_object(models[table_name], tables[table_name], new_objects,
                                                     self_referential=True)
                if table_name not in new_objects:
                    new_objects[table_name] = [new_obj]
                else:
                    new_objects[table_name].append(new_obj)
                session.add(new_obj)

    for i in tqdm(range(objects_counts[table_name])):
        new_obj = create_random_model_object(models[table_name], tables[table_name], new_objects)
        if table_name not in new_objects:
            new_objects[table_name] = [new_obj]
        else:
            new_objects[table_name].append(new_obj)
        session.add(new_obj)

    session.commit()
pbar = tqdm([x for x in special_tables if special_tables[x] == "IntermediaryTable:"])
for table_name in pbar:
    pbar.set_description("Processing %s" % table_name)
    combinations, lists_names = unique_combinations(tables[table_name], new_objects, objects_counts[table_name])
    i = 0
    for combination in combinations:
        new_obj = models[table_name](**{label: integer for integer, label in zip(combination, lists_names)})
        if table_name not in new_objects:
            new_objects[table_name] = [new_obj]
        else:
            new_objects[table_name].append(new_obj)
        session.add(new_obj)
session.commit()

for column in new_objects.keys():
    print(column)
    for i in range(1):
        for field in new_objects[column][i].__table__.columns.keys():
            print(f"{field}: {getattr(new_objects[column][i], field)}")
        print('\n')
    print('\n\n')
session.close()


