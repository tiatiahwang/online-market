import Home from '@/public/svgs/home.svg';
import HomeFull from '@/public/svgs/home-full.svg';
import Life from '@/public/svgs/life.svg';
import LifeFull from '@/public/svgs/life-full.svg';
import Chat from '@/public/svgs/chat.svg';
import ChatFull from '@/public/svgs/chat-full.svg';
import User from '@/public/svgs/user.svg';
import UserFull from '@/public/svgs/user-full.svg';
import Plus from '@/public/svgs/plus.svg';
import Photo from '@/public/svgs/photo.svg';
import XMark from '@/public/svgs/x-mark.svg';
import ArrowRight from '@/public/svgs/arrow-right.svg';

type SvgProps = {
  width: string;
  height: string;
  fill?: string;
  stroke?: string;
};

export const HomeIcon = ({ width, height, stroke }: SvgProps) => {
  return <Home width={width} height={height} stroke={stroke} />;
};

export const HomeFullIcon = ({ width, height, fill }: SvgProps) => {
  return <HomeFull width={width} height={height} fill={fill} />;
};

export const LifeIcon = ({ width, height, stroke }: SvgProps) => {
  return <Life width={width} height={height} stroke={stroke} />;
};

export const LifeFullIcon = ({ width, height, fill }: SvgProps) => {
  return <LifeFull width={width} height={height} fill={fill} />;
};

export const ChatIcon = ({ width, height, stroke }: SvgProps) => {
  return <Chat width={width} height={height} stroke={stroke} />;
};

export const ChatFullIcon = ({ width, height, fill }: SvgProps) => {
  return <ChatFull width={width} height={height} fill={fill} />;
};

export const UserIcon = ({ width, height, stroke }: SvgProps) => {
  return <User width={width} height={height} stroke={stroke} />;
};

export const UserFullIcon = ({ width, height, fill }: SvgProps) => {
  return <UserFull width={width} height={height} fill={fill} />;
};

export const PlusIcon = ({ width, height, fill }: SvgProps) => {
  return <Plus width={width} height={height} fill={fill} />;
};

export const PhotoIcon = ({ width, height, stroke }: SvgProps) => {
  return <Photo width={width} height={height} stroke={stroke} />;
};

export const XIcon = ({ width, height, stroke }: SvgProps) => {
  return <XMark width={width} height={height} stroke={stroke} />;
};

export const ArrowRightIcon = ({ width, height, stroke }: SvgProps) => {
  return <ArrowRight width={width} height={height} stroke={stroke} />;
};
