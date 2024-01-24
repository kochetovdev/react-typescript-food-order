interface Props {
  title: string;
  message: string;
}

const Error = ({ title, message }: Props) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
