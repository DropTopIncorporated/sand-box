[{"operationName":"BrowsePage_AllDirectories","variables":{"limit":100,"options":{"recommendationsContext":{"platform":"web"},"requestID":"JIRA-VXP-2397","sort":"VIEWER_COUNT","tags":[]},"cursor":"eyJvZmYiOjIwOCwiYmxrIjowLCJzdWIiOnsiMSI6eyJvZmYiOjEwMCwidG90IjoxMDB9LCIyIjp7Im9mZiI6MTgyLCJ0b3QiOjMyOSwiY3VyIjoiZXlKeklqb3hPRElzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCIzIjp7Im9mZiI6MCwidG90IjowfX19"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"78957de9388098820e222c88ec14e85aaf6cf844adf44c8319c545c75fd63203"}}}]
g
^^ this gets us the games in directory (1ST FETCH CALL) -- filter through to see which games have active drop campaign array of a length of at least 1. -- put the results through the 2nd fetch call. -- keep this information in Game Model


[{"operationName":"DirectoryPage_Game","variables":{"name":"call of duty: modern warfare","options":{"sort":"RELEVANCE","recommendationsContext":{"platform":"web"},"requestID":"JIRA-VXP-2397","tags":[]},"sortTypeIsRecency":false,"limit":30},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"5feb6766dc5d70b33ae9a37cda21e1cd7674187cb74f84b4dd3eb69086d9489c"}}}]

^^^ this gets us all the channels streaming at the time for a certain game (2ND FETCH CALL) -- get all usernames and run them ALL through the 3rd fetch call. 


[{"operationName":"Drops_ChannelDrops_User","variables":{"login":"kitboga","isLoggedIn":false},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"f309b1d517d288074d50d96512059857cc67d8905d1379e414d70f7b981f2618"}}}]
^^^ this gets us the information we need on each channel (3RD FETCH CALL) --> this is what we filter through to see who has drops enabled and then we run the fetch call to the normal api to get streamer information to put into Stream Model




