use KnowItAll;

insert into KUser(username, passwordHash) values 
(
	"user1",
    111421 		# actual password is pwd
);

insert into KUser(username, passwordHash) values
(
	"joyce",
    111421
);

insert into KUser(username, passwordHash) values
(
	"summer",
    111421
);

insert into KUser(username, passwordHash) values
(
	"Robert",
    111421
);


insert into KUser(username, passwordHash) values
(
	"WoongHee",
    111421
);


insert into KUser(username, passwordHash) values
(
	"Edward",
	111421
);

insert into KUser(username, passwordHash, isAdmin) values
(
	"Admin1",
    111421,
    true
);

insert into Tag(tagStr) values ("Pizza");
insert into Tag(tagStr) values ("Movie");
insert into Tag(tagStr) values ("USC");
insert into Tag(tagStr) values ("Course");

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous, image) 
values (
	2, 
    true,
	"What is the best pizza place around USC?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum orci sit amet ipsum rutrum sed.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nibh id lacus dignissim commodo id vitae libero. Nunc sapien dolor, sodales in suscipit at, blandit et velit. Cras maximus tellus ac nulla rutrum, vel gravida nunc finibus. Duis aliquet, libero non suscipit dapibus, quam augue semper elit, sit amet.",
    0,
    false,
    "https://i.ytimg.com/vi/1X6OAucemtE/maxresdefault.jpg"
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous, image) 
values (
	1, 
    true,
	"What is the best CS course at USC?",
    "USC",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a tempor ligula. Maecenas tortor orci, posuere sed hendrerit in, vulputate et sem. Sed in consectetur purus, a imperdiet nunc.",
    0,
    true,
    "http://www.austincc.edu/sites/default/files/Computer-Science_10282016.jpg"
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous, image)  
values (
	1, 
    true,
	"What movie should I watch?",
    "nothing",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a tempor ligula. Maecenas tortor orci, posuere sed hendrerit in, vulputate et sem. ",
    0,
    false,
    "https://cdn-media-1.lifehack.org/wp-content/files/2014/06/Frozen-Free-Wallpaper.jpg"
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, positiveVotes, isAnonymous) 
values (
	2, 
    true,
	"CS Course recommendation",
    "USC",
    "Please help me w my schedule next semester!",
    0, 
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous, image) 
values (
	2,
    false,
	"USC Football",
    "USC",
    "2017-10-17",
    "How are we doing this year?! ",
    0,
    false,
    "http://sportsformulator.com/wp-content/uploads/2016/04/USC-Football-1024x576.jpg"
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous, image) 
values (
	3,
    true,
	"Study-friendly coffee shops on campus?",
    "USC",
    "2017-10-17",
    "What do u guys think?",
    0,
    false,
    "https://www.healthline.com/hlcmsresource/images/topic_centers/Food-Nutrition/Coffee1-banner.jpg"
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous) 
values (
	3,
    false,
	"Leavey library",
    "USC",
    "2017-10-17",
    "how do u guys think about leavey?",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	3, 
    false,
	"What do u guys think about USC Village?",
    "USC",
    "Good? Bad?",
    0,
    true
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	3, 
    false,
	"Rate CS310",
    "USC",
    "What do you guys think about CS310?",
    0,
    false
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "California Pizza Kitchen",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "Pizza Studio",
    16
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "Domino",
    23
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "Papa Johns",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "CS310",
    20
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "CS104",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "CS201",
    14
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "CS360",
    8
);



insert into PollOption(questionID, title, votes) 
values (
	3,
    "Frozen",
    6
);

insert into PollOption(questionID, title, votes) 
values (
	3,
    "Thor, Ragnarok",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	3,
    "It",
    2
);

insert into PollOption(questionID, title, votes) 
values (
	3,
    "Despicable Me 3",
    17
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "CS103",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "CS104",
    8
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "CS109",
    7
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "ITP115",
    13
);


insert into PollOption(questionID, title, votes) 
values (
	6,
    "Starbucks next to leavey",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	6,
    "Nature's Brew",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	6,
    "Startbucks - UV",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	6,
    "Starbucks - Cafe84",
    0
);


insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	1,
    5,
    "WoongHee",
    "I like CPK! it's the best",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	1,
    4,
    "Robert",
    "We need another pizza place....",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	2,
    3,
    "Summer",
    "Take 310!!!",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	3,
    2,
    "Joyce",
    "Helpful Poll!!",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	4,
    1,
    "user1",
    "Hey! I like this poll",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	5,
    2,
    "Joyce",
    "Go USC",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	6,
    2,
    "Anonymous",
    "Dulce is coming soon!",
    true,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	6,
    6,
    "Edward",
    "starbucks at cafe84 is 24hrs!",
    false,
    0,
    0
);


# users 1 and 2 follow eachother
insert into userToFollowing(mainUserID, followingUserID)
values(1,2);
insert into userToFollowing(mainUserID, followingUserID)
values(2,1);

update KUser set numFollowers = 1 where userID = 1;
update KUser set numFollowers = 1 where userID = 2;

update KUser 
set bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices ultrices felis cras amet.",
imageURL = "https://i.redd.it/lpj7hm6t9zly.jpg" 
where userID = 2;

update KUser 
set bio = "I'm a computer science major, and I love pho and pigs!",
imageURL = "http://www.critterbabies.com/wp-content/uploads/2014/11/p2.jpg" 
where userID = 3;


insert into UserToQuestion(userID, questionID) values (1, 2);
insert into UserToQuestion(userID, questionID) values (1, 3);
insert into UserToQuestion(userID, questionID) values (2, 1);
insert into UserToQuestion(userID, questionID) values (2, 4);
insert into UserToQuestion(userID, questionID) values (2, 5);
insert into UserToQuestion(userID, questionID) values (3, 6);
insert into UserToQuestion(userID, questionID) values (3, 7);
insert into UserToQuestion(userID, questionID) values (3, 8);
insert into UserToQuestion(userID, questionID) values (3, 9);

insert into TagToQuestion(tagID, questionID) values (1, 1);
insert into TagToQuestion(tagID, questionID) values (1, 2);
insert into TagToQuestion(tagID, questionID) values (2, 2);
insert into TagToQuestion(tagID, questionID) values (2, 3);
insert into TagToQuestion(tagID, questionID) values (3, 4);
insert into TagToQuestion(tagID, questionID) values (3, 5);
insert into TagToQuestion(tagID, questionID) values (1, 6);
insert into TagToQuestion(tagID, questionID) values (2, 6);
insert into TagToQuestion(tagID, questionID) values (3, 6);
insert into TagToQuestion(tagID, questionID) values (4, 8);

insert into QuestionToPollOption(questionID, pollOptionID) values(1, 1);
insert into QuestionToPollOption(questionID, pollOptionID) values(1, 2);
insert into QuestionToPollOption(questionID, pollOptionID) values(2, 3);
insert into QuestionToPollOption(questionID, pollOptionID) values(4, 4);
insert into QuestionToPollOption(questionID, pollOptionID) values(6, 5);
insert into QuestionToPollOption(questionID, pollOptionID) values(6, 6);

