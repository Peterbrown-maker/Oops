import java.util.Scanner;
public class split{


public static void main(String[] args) {
    String mysString;
    Scanner input = new Scanner(System.in);

    System.out.println("ENTER WORD");
    mysString=input.nextLine();

for (int i = 0; i < mysString.length(); i++) {
    char ch =mysString.charAt(i);
    if (i%5==0) {
        
        String array []=mysString.split(mysString,mysString.length());
    } 
     System.out.println(array[i]);
}

}



}