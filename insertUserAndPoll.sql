use KnowItAll;

insert into KUser(username, passwordHash) values 
(
	"user1",
    1
);

insert into Poll(userID, title, subTitle, description, totalVotes) 
values (
	1, 
	"First Poll!",
    "the first poll subtitle",
    "the poll desc",
    0
);