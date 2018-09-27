import { renderReact } from 'hypernova-react';
import MyComponent from './MyComponent.js';

export default renderReact(
    'MyComponent.ssr.js', // this file's name (or really any unique name)
    MyComponent,
);
