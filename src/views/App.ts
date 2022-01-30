import { html } from '~/utils';
import { Header } from './Header';
import {PlayerView} from './Player';
import './App.css';

export function App() {

  return html`
    <div class="App">
      ${Header()}
      ${PlayerView()}
    </div>
  `;
}
