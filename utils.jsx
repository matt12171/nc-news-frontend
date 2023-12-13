const votedPosts = [];


export const arrowClicked = (index, direction, articles) => {
    for (let i = 0; i < votedPosts.length; i++) {
      if (articles.element[index].article_id === votedPosts[i]) {
        return alert("Already voted");
      }
    }
    if (direction === "up") {
      setTopClickedArrowIndex(topClickedArrowIndex === index ? null : index);
      setBottomClickedArrowIndex(null);
      articles.element[index].votes += 1;
      patchArticleVote(articles.element[index].article_id, 1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          alert("Vote did not update");
        });
      votedPosts.push(articles.element[index].article_id);
      
    } else if (direction === "down") {
      setBottomClickedArrowIndex(
        bottomClickedArrowIndex === index ? null : index
      );
      setTopClickedArrowIndex(null);
      articles.element[index].votes -= 1;
      patchArticleVote(articles.element[index].article_id, -1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          alert("Vote did not update");
        });
      votedPosts.push(articles.element[index].article_id);
      
    }
  };