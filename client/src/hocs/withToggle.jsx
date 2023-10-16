import React, { useState } from 'react';

export const withToggle = (WrappedComponent) => function (props) {
  const [toggleStatus, setToggleStatus] = useState(false);

  const toggle = () => {
    setToggleStatus(!toggleStatus);
  };

  return (
    <WrappedComponent
      {...props}
      toggle={toggle}
      toggleStatus={toggleStatus}
    />
  );
};
