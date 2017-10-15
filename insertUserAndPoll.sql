use KnowItAll;

insert into KUser(username, passwordHash) values 
(
	"user1",
    1
);

insert into Tag(tagStr) values ("t1");
insert into Tag(tagStr) values ("t2");
insert into Tag(tagStr) values ("t3");

insert into Poll(userID, title, subTitle, description, totalVotes) 
values (
	1, 
	"First Poll! 1",
    "the first poll subtitle",
    "TAGS 1, 2",
    0
);

insert into Poll(userID, title, subTitle, description, totalVotes) 
values (
	1, 
	"Another poll 2",
    "subtitle",
    "Tags 2",
    0
);

insert into Poll(userID, title, subTitle, description, totalVotes) 
values (
	1, 
	"Another poll 3",
    "subtitle",
    "Tags 1",
    0
);

insert into TagToPoll(tagID, pollID) values (1, 1);
insert into TagToPoll(tagID, pollID) values (2, 1);
insert into TagToPoll(tagID, pollID) values (2, 2);
insert into TagToPoll(tagID, pollID) values (1, 3);