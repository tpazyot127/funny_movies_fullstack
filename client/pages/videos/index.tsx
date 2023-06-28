import SEO from '../../components/SEO';
import VideosShare from '../../components/VideosShare';
import { NextPage } from 'next';
import { homeConfig } from '../../utils/config';

const CartPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <VideosShare />
      </main>
    </>
  );
};

export default CartPage;
