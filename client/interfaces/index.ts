export interface VideosInterface {
  _id: string;
  url: string;
  title: string;
  username : string;
  description: string;
  likes: number;
  dislikes: number;
}

export interface CartItemInterface {
  productId: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface CartInterface {
  cartItems: CartItemInterface[];
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  itemsPrice: number;
  totalPrice: number;
}

export interface UserInterface {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  accessToken: string;
}

export interface UserCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserEditCredentials {
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface ShippingDetails {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface OrderInterface {
  _id?: string;
  orderItems: CartItemInterface[];
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  itemsPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  createdAt?: string;
  paymentResult?: PaymentResult;
  user?: {
    name: string;
    email: string;
  };
}

export interface Review {
  name?: string;
  _id?: string;
  user?: string;
  createdAt?: string;
  rating: number;
  comment: string;
}

export interface PaginatedVideos {
  url: VideoInterface[];
  user: string;
  page: number;
}

export interface VideoInterface {
  _id: string;
  url: string;
  title: string;
  username:string;
  description: string;
  likes: number;
  dislikes: number;
}
