import {ServerOptions} from 'ws';

interface ConfigInterface {
  path: ServerOptions['path'];
  server: ServerOptions['server'];
}

export default ConfigInterface;
