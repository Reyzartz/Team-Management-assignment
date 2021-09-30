import { useRef, useEffect, useState } from "react";

const Node = ({ name, title, childFn, index }) => {
  const nodeRef = useRef();
  const [branchHeight, setBranchHeight] = useState(0);

  useEffect(() => {
    console.log(
      name,
      title,
      nodeRef,
      nodeRef.current.offsetHeight,
      nodeRef.current.parentElement.offsetHeight
    );
    setBranchHeight(nodeRef.current.offsetTop);
  }, [nodeRef.current?.offsetTop]);

  return (
    <div className="node" ref={nodeRef}>
      <div className="branch" style={{ height: branchHeight }}></div>
      <h4>{name}</h4>
      <h5>{title}</h5>
      {childFn && <div className="child">{childFn()}</div>}
    </div>
  );
};

export default Node;
