/*
issues encountered:
	1) adding a role based to both landlord and user module incase the passport authentication fails
	2) adding route security => isLandlord middleware function to secure non admins from accessing it.
	3) do we need more than two passport js authentication files??  no Answer -> try write a new authentication
		for the admin like that of the user and check incase of any errors in passport user login authentication.
		check the priviliges a logged in user is given if he can access the landlord routes


admin priviliges
	== admin can add user /agent
	== admin can delete user 
	== admin can delete comment
	== admin can delete property
	== admin can update user details
	== admin can view all users
	== admin can add about and contact page