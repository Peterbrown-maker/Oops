import java.util.Scanner;
import java.util.Random;

public class SemesterTest2 {
public static void main(String[] args) {
   String[] serviceProviders={"Youtube","Netflix","DSTV","ShowMax","PrimeTv","SABC+"};
   String[] originCountry={"United States","United States","South Africa","South Africa","United States","South Africa"};
   
   int [] subscribers=new int[5];
   int [] userRatings=new int[5];

   //populate array
   populateSubcriber(subscribers);
   populateRating(userRatings,serviceProviders);
   //most watched
  int subscriber= mostWatchedServices(subscribers);
   sortServiceProvider(serviceProviders,originCountry,subscribers,userRatings);
   displayDetails(serviceProviders,originCountry,subscribers,userRatings);

}
    
public static void populateSubcriber(int[]vPopulate){
    Random randomizzer = new Random();
    int min = 100000;
    int max = 500000;
 for(int i=0;i<vPopulate.length;i++){
    vPopulate[i]=randomizzer.nextInt(max-min+1)+min;
 }
    }
public static void populateRating(int[]vUserRating,String[]vServicesProvider){
    Scanner input = new Scanner(System.in);
    for (int i = 0; i < vUserRating.length; i++) {
        System.out.println("Enter user rating(1-5) for "+vServicesProvider[i]);
         vUserRating[i]=input.nextInt();
    }

    
}
public static int mostWatchedServices(int[]iSubscribers){
   int highestMark =0;
   for(int i=0;i<iSubscribers.length;i++){
      if(highestMark < iSubscribers[i]){
        highestMark=iSubscribers[i];
        
      } 

   }
return highestMark;

}
public static void sortServiceProvider(String[] vServiceProvider,String[]vOriginCountry,int[]vSubscribers,int[]vUserRating){

String tempService,tempOriginCountry;
int tempSubscriber,tempUserRating;
for(int i=0;i<vServiceProvider.length-1;i++){
  for(int j=0;j<vSubscribers.length-1;j++){
    if (vServiceProvider[j].compareTo(vServiceProvider[j+1])>0) {
      
      tempService=vServiceProvider[j];
      vServiceProvider[j]=vServiceProvider[j+1];
      vServiceProvider[j+1]=tempService;

      tempOriginCountry=vOriginCountry[j];
      vOriginCountry[j]=vOriginCountry[j+1];
      vOriginCountry[j+1]=tempOriginCountry;
 }
 else if(vSubscribers[j]>vSubscribers[j+1]){

     tempSubscriber=vSubscribers[j];
     vSubscribers[j]=vSubscribers[j+1];
     vSubscribers[j+1]=tempSubscriber;
   
     tempUserRating=vUserRating[j];
     vUserRating[j]=vUserRating[j+1];
     vUserRating[j+1]=tempUserRating;



   }

} }
 }
 public static void displayDetails(String[]vServiceProvider,String[]vOriginCountry,int[]vSubscribers,int[]vUserRating){
   System.out.println("-----------------------------------------------------------------------------------");
   System.out.println("Service Providers \t"+"Country \t"+"Subscribers \t"+"UserRating");
   
   for (int i = 0; i < vUserRating.length; i++) {
      System.out.println(vServiceProvider[i]+" \t "+vOriginCountry[i]+" \t "+vSubscribers[i]+" \t "+vUserRating[i]);
   }
 }
 
  }
