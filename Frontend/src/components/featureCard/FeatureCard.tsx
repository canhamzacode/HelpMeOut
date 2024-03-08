type FeatureCardProps = {
  img: string;
  title: string;
  description: string;
};

const FeatureCard = ({ img, title, description }: FeatureCardProps) => {
  return (
    <div className="flex gap-[10px]">
      <img src={img} alt={title} className="w-[50px] h-[50px] " />
      <div className="w-full grid gap-[15px]">
        <h3 className="text-[#1B233D] text-xl font-semibold"> {title} </h3>
        <p className="text-grey font-workSans text-[16px]">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
