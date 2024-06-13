package com.backend.chmiel.tests.api
import com.backend.chmiel.auth.AuthenticationRequest
import com.backend.chmiel.auth.AuthenticationService
import com.backend.chmiel.config.JwtService
import com.backend.chmiel.dao.UserRepository
import com.backend.chmiel.entity.Role
import com.backend.chmiel.entity.User
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.password.PasswordEncoder
import spock.lang.Specification


class AuthTest extends Specification {
    def "should be a simple assertion"() {
        expect:
        1 == 1
    }
    UserRepository userRepository = Mock()
    PasswordEncoder passwordEncoder = Mock()
    JwtService jwtService = Mock()
    AuthenticationManager authenticationManager = Mock()

    AuthenticationService authenticationService = new AuthenticationService(
            userRepository,
            passwordEncoder,
            jwtService,
            authenticationManager
    )

    def "authenticate should authenticate a user and return a valid JWT token"() {
        given: "a valid authentication request"
        def request = new AuthenticationRequest(
                email: "john.doe@example.com",
                password: "password123"
        )

        and: "a user from the repository"
        def user = new User(
                id: 1L,
                firstName: "John",
                lastName: "Doe",
                email: request.email,
                password: "encodedPassword123",
                role: Role.USER
        )

        when: "authenticate method is called"
        authenticationManager.authenticate(_ as UsernamePasswordAuthenticationToken) >> Mock(Authentication)
        userRepository.findByEmail(request.email) >> Optional.of(user)
        jwtService.generateToken({ Map<String, Object> claims -> claims.userId == 1L }, user) >> "valid-jwt-token"

        def response = authenticationService.authenticate(request)

        then: "authenticationManager.authenticate is called with correct parameters"
        1 * authenticationManager.authenticate({
            it.principal == request.email &&
                    it.credentials == request.password
        } as UsernamePasswordAuthenticationToken)

        and: "userRepository.findByEmail is called with the correct email"
        1 * userRepository.findByEmail(request.email) >> Optional.of(user)

        and: "jwtService.generateToken is called with the correct parameters"
        1 * jwtService.generateToken({ Map<String, Object> claims -> claims.userId == 1L }, user) >> "valid-jwt-token"

        and: "response contains the valid JWT token"
        response.token == "valid-jwt-token"
    }

}
