-- DELETE FROM CommentLike WHERE userID=1 
-- and questionCommentID=10;
-- DELETE FROM QuestionComment 
-- WHERE questionID=1
-- and userID=1
-- and description="dfdfdf";
-- 
-- DELETE CommentLike
-- FROM CommentLike cl JOIN QuestionComment qc ON cl.QuestionComment = qc.QuestionComment
-- WHERE QuestionComment=1
-- and userID=1
-- and description="dfdfdf";
-- 
DELETE FROM CommentLike, QuestionComment 
USING QuestionComment INNER JOIN CommentLike 
WHERE questionCommentID = 6 AND
CommentLike.questionCommentID = QuestionComment.questionCommentID;