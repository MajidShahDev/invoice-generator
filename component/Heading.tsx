import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Heading() {
  return (
    <>
      <div className="w-[600px] grid grid-cols-[2.5fr_1.1fr_1.1fr_1.5fr_0.4fr] gap-2 mb-4 items-center bg-gray-900">
        <span className="tracking-widest text-gray-50 bg-gray-600 p-2 -300 rounded pl-2.5">
          Item / Service
        </span>
        <span className="tracking-widest text-center text-gray-50 bg-gray-600 p-2 -300 rounded">
          Quantity
        </span>
        <span className="tracking-widest text-center text-gray-50 bg-gray-600 p-2 -300 rounded">
          Rate
        </span>
        <span className="tracking-widest text-center text-gray-50 bg-gray-600 p-2 -300 rounded">
          Amount
        </span>
        <span className="tracking-widest text-center text-gray-50 bg-gray-600 p-2 -300 rounded">
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
    </>
  );
}
