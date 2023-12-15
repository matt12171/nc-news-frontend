export const Error = (error) => {
  console.log
  if (!error.element) {
    return <div>Incorrect Path</div>
  } else {
    return (
      <div>
        {error.element.err.message}
      </div>
    );
  }
  
};
