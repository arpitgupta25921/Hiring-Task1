import java.io.*;

class ABC
{
public static void main(String ar[]) throws IOException
{
int a,b,c,k=0;
BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
do
{
try
{
System.out.println("Enter a and b");
a=Integer.parseInt(br.readLine());
b=Integer.parseInt(br.readLine());
c=a/b;
System.out.println(c);
k=1;
}
catch(ArithmeticException e)
{
//System.out.println(e.getMessage());
System.out.println("Second no. must be non zero");
}
catch(NumberFormatException e)
{
//System.out.println(e.getMessage());
System.out.println("Enter Digits only");
}
}while(k!=1);
}
}




