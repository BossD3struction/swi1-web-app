package cz.osu.app.configurations;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper().enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
    }
}
