function PageHeader(props: { title: string; bodyText?: string }) {
    return (
        <header className="w-full">
            <h1 className="text-2xl font-bold">{props.title}</h1>
            {props.bodyText && (
                <p className="text-base text-zinc-300 my-1">{props.bodyText}</p>
            )}
        </header>
    );
}

export default PageHeader;
