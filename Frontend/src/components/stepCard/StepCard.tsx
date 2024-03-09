type StepCardType = {
  num: number;
  title: string;
  description: string;
  img: string;
};
const StepCard = ({ num, title, description, img }: StepCardType) => {
  return (
    <div className="w-full grid gap-[15px] items-center justify-center">
      <div className="h-[60px] w-[60px] bg-primary text-center rounded-full text-white flex items-center justify-center text-xl font-bold mx-auto">
        {num}
      </div>
      <div className="w-full flex items-center justify-center">
        <h3 className="text-text-primary text-xl font-semibold">{title}</h3>
      </div>
      <div className="w-full flex items-center justify-center">
        <p className="text-grey text-[16px] text-center ">{description}</p>
      </div>
      <div className="w-full h-[250px]">
        <img src={img} alt={title} className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default StepCard;
