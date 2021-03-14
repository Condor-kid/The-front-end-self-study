'This default template script is in VBScript. You can write scripts in your language of choice and save them with the proper extension, or use your an editor specific to that language.

'See the TESDK help file for more details on how the scripting feature works and for information on each supported method and property.

'You must have Windows Scripting Host installed for the COM enabled engine to work. Run the Transfer Engine once to register it (as a COM object) on the target system.

'If you're having problems with running scripts while not logged in, or when trying to run them using MS scheduler, refer to our online knowledgebase for help (http://www.globalscape.com/support)

'Look into c:\temp folder to observe local activity (for testing purposes) or right click on the Transfer Engine icon in the systray and select "show current transfers"

'This sample script performs an anonymous login to ftp://ftp.globalscape.net

   'First declare a variable called Mysite. This will hold the reference to the TE COM object.

   Dim MySite

   'Create a connection object and assign it to the variable

   Set MySite = CreateObject("CuteFTPPro.TEConnection")
	
   ' Now set each property for the site connection 
   ' You can omit this section to use the default values, but you should at least specify the Host
   'The default Protocol is FTP, however SFTP (SSH2), FTPS (SSL), HTTP, and HTTPS can also be used)

   MySite.Protocol = "FTP"
   MySite.Host = "ftp.globalscape.com"

   'following lines are optional since the default is anonymous if no login and password are defined

   MySite.Login = "anonymous"
   MySite.Password = "user@user.com"

   'if necessary, use the UseProxy method and ProxyInfo or SocksInfo properties to connect through a proxy server

   MySite.UseProxy = "BOTH"

   'now connect to the site (also called called implicitly when most remote methods are called)

   MySite.Connect

	
   'perform some logic to verify that the connection was made successfully

   If (Not Cbool(MySite.IsConnected)) Then	
      MsgBox "Could not connect to: " & MySite.Host & "!"
      Quit(1)
   End If

   'The script will now check to see if the local folder c:\temp exists and will create it if necessary

   If (Not (MySite.LocalExists("c:\temp"))) Then
      MySite.CreateLocalFolder "c:\temp"
   End If

   'Change TE's local working folder to to c:\temp
   MySite.LocalFolder = "c:\temp"

   'Check for existence of remote folder "/pub/cuteftp"
   b = MySite.RemoteExists("/pub/cuteftp/")

   If (Not CBool(b)) Then
      'Verify existence of remote folder
      MsgBox "Remote folder not found!. Please make sure that the Pub folder exists on the remote site"
      Quit(1)
   End If

   'Now download the index file to the local destination folder
   MySite.Download "/pub/cuteftp/index.txt"

   'Complete.  Show the status of this transfer.
   MsgBox "Task done, final status is '" + MySite.Status + "'"

  MySite.Disconnect
  MySite.Close

'End of sample script. You can save you script and then run it by either selecting it from the Tools > Run Script menu or by double clicking on the script file in Windows
