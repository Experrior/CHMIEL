package com.backend.chmiel.tests.api

import com.backend.chmiel.dao.UserRepository
import com.backend.chmiel.entity.User
import org.springframework.boot.test.context.SpringBootContextLoader
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration
import spock.lang.Specification
import org.springframework.beans.factory.annotation.Autowired

//@WebAppConfiguration
@ContextConfiguration(loader = SpringBootContextLoader.class, classes = [])
@SpringBootTest("0") // use random port for testing
class UserTest extends Specification {

    @Autowired
    private UserRepository userRepository

    def "create a new user"() {
        given:
            Random random = new Random();
            StringBuilder stringBuilder = new StringBuilder(30);

            for (int i = 0; i < 30; i++) {
                int randomDigit = random.nextInt(10);
                stringBuilder.append(randomDigit);
            }
            String email = 'john.doe'+stringBuilder+'example.com'
            User user = new User(firstName: 'John', lastName: 'Doe', email: email, password: 'password123', address: '123 Main St', birthDate: new java.sql.Date(1999,12,1), phoneNumber: '123-456-7890')

        when:
            userRepository.save(user)

        then:
            user.id != null

        cleanup:
            userRepository.delete(user)
    }

    def "test find all users"() {
        given:
            Integer userCount = userRepository.findAll().size()


        when:
            User user1 = new User(firstName: 'John', lastName: 'Doe', email: 'john.doe1@example.com', password: 'password123', address: '123 Main St', birthDate: new java.sql.Date(1999,12,1), phoneNumber: '123-456-7890')
            User user2 = new User(firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', password: 'password123', address: '456 Oak St', birthDate: new java.sql.Date(1999,12,1), phoneNumber: '987-654-3210')
            userRepository.save(user1)
            userRepository.save(user2)
            List<User> users = userRepository.findAll()

        then:
            users.size() == userCount + 2
            users.stream().anyMatch {o -> user1.getId() == o.getId()}
            users.stream().anyMatch {o -> user2.getId() == o.getId()}

        cleanup:
            userRepository.delete(user1)
            userRepository.delete(user2)
    }

    def "test find user by id"() {
        given:
            Random random = new Random();
            StringBuilder stringBuilder = new StringBuilder(30);

            for (int i = 0; i < 30; i++) {
                int randomDigit = random.nextInt(10);
                stringBuilder.append(randomDigit);
            }
            String email = 'john.doe'+stringBuilder+'example.com'
            User user = new User(firstName: 'John', lastName: 'Doe', email: email, password: 'password123', address: '123 Main St', birthDate: new java.sql.Date(1999,12,1), phoneNumber: '123-456-7890')
            userRepository.save(user)

        when:
            Optional<User> optionalUser = userRepository.findById(user.id)

        then:
            optionalUser.isPresent()
            optionalUser.get().email == email

        cleanup:
            userRepository.delete(user)
    }

    def "test update user"() {
        given:
            Random random = new Random();
            StringBuilder stringBuilder = new StringBuilder(30);

            for (int i = 0; i < 30; i++) {
                int randomDigit = random.nextInt(10);
                stringBuilder.append(randomDigit);
            }
            String email = 'john.doe'+stringBuilder+'example.com'
            User user = new User(firstName: 'John', lastName: 'Doe', email: email, password: 'password123', address: '123 Main St', birthDate: new java.sql.Date(1999,12,1), phoneNumber: '123-456-7890')
            userRepository.save(user)

        when:
            String newMail = 'john.doe.updated@example.com'+stringBuilder
            user.email = newMail
            userRepository.save(user)

        then:
            userRepository.findById(user.id).get().email == newMail

        cleanup:
            userRepository.delete(user)
    }

    def "test delete user"() {
        given:
            Random random = new Random();
            StringBuilder stringBuilder = new StringBuilder(30);

            for (int i = 0; i < 30; i++) {
                int randomDigit = random.nextInt(10);
                stringBuilder.append(randomDigit);
            }
            String email = 'john.doe'+stringBuilder+'example.com'
            User user = new User(firstName: 'John', lastName: 'Doe', email: email, password: 'password123', address: '123 Main St', birthDate: new java.sql.Date(1999,12,1), phoneNumber: '123-456-7890')
            userRepository.save(user)

        when:
            userRepository.deleteById(user.id)

        then:
            !userRepository.findById(user.id).isPresent()
    }
}
