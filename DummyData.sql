use KnowItAll;

insert into KUser(username, passwordHash) values 
(
	"user1",
    111421	# actual password is pwd
);

insert into Tag(tagStr) values ("t1");
insert into Tag(tagStr) values ("t2");
insert into Tag(tagStr) values ("t3");

insert into Question(userID, isPoll, title, subTitle, description, totalVotes) 
values (
	1, 
    true,
	"Poll Question 1",
    "poll subtitle",
    "has tags 1, 2",
    0
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes) 
values (
	1, 
    true,
	"Poll Question 2",
    "poll subtitle",
    "has tags 2",
    0
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes) 
values (
	1, 
    true,
	"Poll Question 3",
    "poll subtitle",
    "has tags 1",
    0
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, positiveVotes) 
values (
	1, 
    false,
	"rating Question 1",
    "rating subtitle",
    "has tags 1, 2",
    0, 
    0
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes) 
values (
	1, 
    true,
	"user2 question(1)",
    "user2 subtitle(2)",
    "2017-10-17",
    "",
    0
);

insert into kuser(username, passwordHash)
values("user2", 1234);

insert into kuser(username, passwordHash)
values("user3", 1234);

insert into kuser(username, passwordHash)
values("user4", 1234);

# user 1 follows 2, 3, and 4
insert into userToFollowing(mainUserID, followingUserID)
values(1,2);
insert into userToFollowing(mainUserID, followingUserID)
values(1,3);
insert into userToFollowing(mainUserID, followingUserID)
values(1,4);

# 3 and 4 follows user 1
insert into usertoFollowers(mainUserID, followerUserID)
values(1,2);

insert into usertoFollowers(mainUserID, followerUserID)
values(1,3);



insert into UserToQuestion(userID, questionID) values (1, 1);
insert into UserToQuestion(userID, questionID) values (1, 2);
insert into UserToQuestion(userID, questionID) values (1, 3);
insert into UserToQuestion(userID, questionID) values (1, 4);

insert into TagToQuestion(tagID, questionID) values (1, 1);
insert into TagToQuestion(tagID, questionID) values (2, 1);
insert into TagToQuestion(tagID, questionID) values (2, 2);
insert into TagToQuestion(tagID, questionID) values (1, 3);
insert into TagToQuestion(tagID, questionID) values (1, 6);

