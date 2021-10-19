import { Link } from "@chakra-ui/react";
import React from "react";

const FancyLink = React.forwardRef((props, ref) => (
  <Link
    color="teal.500"
    textDecoration="underline"
    textAlign="center"
    width="100%"
    ref={ref}
    {...props}
    _focus="none"
  >
    {props.children}
  </Link>
));

export default FancyLink;
