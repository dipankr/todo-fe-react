import ServerProperty from "./ServerProperty";

const {localServer, renderServer} = ServerProperty;

const Properties = {
  server: localServer,
  backup: renderServer,
  delay: 4
}

export default Properties;