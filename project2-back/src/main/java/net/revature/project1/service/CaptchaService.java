package net.revature.project1.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Objects;

@Service
public class CaptchaService {
    boolean debug = false;

    @Value("${hcaptcha.secret}")
    private String secret;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean verifyCaptcha(String tokenJson) throws JsonProcessingException {
        String url = "https://hcaptcha.com/siteverify";

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(tokenJson);
        String token = jsonNode.get("token").asText();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("response", token);
        map.add("secret", secret);
        map.add("sitekey", "d80e5192-471a-4678-b5be-8a22b3445e42");

        if(debug){
            System.out.println("The token is: " + token);
            System.out.println("The secret is: " + secret);
            System.out.println("The sitekey is: " + "d80e5192-471a-4678-b5be-8a22b3445e42");
        }

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    url,
                    request,
                    Map.class
            );

            if(debug){
                System.out.println(response.getBody());
            }

            return response.getStatusCode() == HttpStatus.OK &&
                    Boolean.TRUE.equals(Objects.requireNonNull(response.getBody()).get("success"));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}