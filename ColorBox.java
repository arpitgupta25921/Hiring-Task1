import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

class ColorBox  implements ActionListener
{
Frame f;
Panel p;
Button b1,b2;
TextArea ta;
ColorBox()
{
f=new Frame();
p=new Panel();
ta=new TextArea();
ta.setFont(new Font("Arial",1,30));
b1=new Button("Font Color");
b2=new Button("Back Color");
b1.addActionListener(this);
b2.addActionListener(this);
p.add(b1);
p.add(b2);
f.add(ta);
f.add(p,BorderLayout.SOUTH);
f.setVisible(true);
f.setSize(400,400);
}
public static void main(String ar[])
{
ColorBox c=new ColorBox();
}
public void actionPerformed(ActionEvent e)
{
if(e.getSource()==b1)
{
JColorChooser jc=new JColorChooser();
Color c=jc.showDialog(null,"Pick ur color",Color.red);
ta.setForeground(c);
}
if(e.getSource()==b2)
{
JColorChooser jc=new JColorChooser();
Color c=jc.showDialog(null,"Pick ur color",Color.yellow);
ta.setBackground(c);
}


}
}





