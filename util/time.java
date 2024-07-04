import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
public class time {
    public static void main(String[] args) {
        LocalDateTime currentDateTime = LocalDateTime.now();
       
       // Define the desired date and time format
       DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy, HH:mm:ss", Locale.ENGLISH);
       
       // Format the current date and time
       String formattedDateTime = currentDateTime.format(formatter);
       
       // Display the formatted date and time
       System.out.println("Formatted Date and Time: " + formattedDateTime);

   }
}
// Online Java Compiler
// Use this editor to write, compile and run your Java code online
