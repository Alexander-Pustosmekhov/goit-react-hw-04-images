import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { MutatingDots } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.Loader}>
      <MutatingDots color="#00BFFF" />
    </div>
  );
}
