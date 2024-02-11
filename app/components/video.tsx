type Props = {
  id: string;
};

export default function Video({ id }: Props) {
  return (
    <div className="aspect-w-16 aspect-h-9"> {
    /* above is from the aspect-ratio from tailwind we added. it concerns video of w-16 h-9 the best size */}
      <iframe  
      /* this iframe comes from youtube . you can have all the props there */
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
