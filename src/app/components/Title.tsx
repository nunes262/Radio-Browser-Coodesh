interface TitleProps {
    name : string;
}

export const Title = ({ name } : TitleProps) => {
    return (
        <div className="w-full flex items-center justify-center ">
            <h1 className="text-3xl font-bold text-zinc-200">{name}</h1>
        </div>
    );
}
