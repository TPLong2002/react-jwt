import Nav from "./Nav";

function DefaulLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

export default DefaulLayout;
