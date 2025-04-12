export const Image = (props) => {
  return (
    <>
      <div className="w-20 h-20 rounded-full">
        <img
          src={props.pic}
          alt="user profile pic"
          className="w-full h-full object-center rounded-full"
        />
      </div>
    </>
  );
};
