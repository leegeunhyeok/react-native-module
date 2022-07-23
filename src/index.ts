
import { NativeModules } from 'react-native';

// Change `MODULE_NAME` to your module name.
const Module = NativeModules.MODULE_NAME;

export const run = (name: string): Promise<string> => Module.run(name);

export default Module;
