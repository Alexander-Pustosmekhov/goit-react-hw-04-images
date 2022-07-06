import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { MutatingDots } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="Loader">
      <MutatingDots color="#00BFFF" height={80} width={80} />
    </div>
  );
}
