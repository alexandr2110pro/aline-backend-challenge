# Aline Backend Challenge

Implement the simple public chat realtime application (with a single thread for all messages from all users) 
and a log panel that shows logs of all actions in the system.

 
## Chat App Specs:

- `User` can open the app, enter his name in the field and click login to enter the app 
- `LoggedUser` can reload the page in the same browser and stay logged-in
- `LoggedUser` can type and send the `Messages` and see his `Message` in the thread.
- `LoggedUser` can see `Messages` of other `LoggedUser's` without reloading the page. 
- `LoggedUser` can `like` and `dislike` the `Message`

`Message` should contain the name of the sender and "liked" status.

Opening the app in another browser should allow to login as another user. 

## Log Panel Specs:

- `User` can open the panel and see the list of all `Actions` in the Chat App:
   - `user <name> created <time>`
   - `user <name> has logged-in <time>`
   - `user <name> has created a message <time>` (no need to list the message text)
   - `user <name> has liked the message of user <name> <time>` (no need to list the message text)
   - `user <name> has disliked the message of user <name> <time>` (no need to list the message text)
- `User` should be able to see new `Actions` without reloading the page.


## Implementation requirements:

- client could be as simple as possible. Only required minimum of elements, minimum logic, no styles & etc.
- write node code in es6 and use `babel-node` to run it. 
- backend should contain **at least** 3 separate node.js services that can run independently.
   - 1 for the users
   - 1 for the messages
   - 1 for the logs
- no "real" auth flow is required. Any kind of token or cookie will do.
- use any frameworks/libraries you want (or don't use at all).
- use any other technologies you like from mongo to cloud services - it's all up to you
- any real persistence is not required but is not restricted as well - it's up to you as well

> In general, keep the implementation rather simple. The architecture is more important in this challenge.

## Other requirements: 

Create a fork, implement and create a pull request on the github.

Append a gif file for each use case:
 - login 2 users from 2 browsers & reload both browsers & show the log panel
 - post some messages & show the log panel
 - like/dislike some messages & show the log panel

## Tests: 

Start Redis server locally before starting the tests!

![Test 1]( http://i.imgur.com/HNprkkh.gif "Test 1")

![Test 2]( http://i.imgur.com/GwYn9Br.gif "Test 2")

![Test 3]( http://i.imgur.com/703reLX.gif "Test 3")

