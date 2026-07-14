package volodea.cv.init;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import volodea.cv.model.User;
import volodea.cv.repository.UserRepository;


@Component
public class DataInitializer implements CommandLineRunner {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.count() == 0) {
            User me = new User("vova", "Vladimir Cazmaly", "R. Moldova"
                    , "url"
                    , "vk4935391@gmail.com"
                    , "@v_pelmen_v"
                    , "https://leetcode.com/u/vk4935391/"
                    , "https://github.com/QBerserkQ");

            userRepository.save(me);
        }
    }
}
