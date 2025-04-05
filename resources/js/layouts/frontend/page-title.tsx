interface PageTitleProps {
    title: string;
    subTitle?: string;
    description?: string;
}

export default function PageTitle({ title, subTitle, description }: PageTitleProps) {
    return (
        <div className="page-title">
            <div className="container">
                <h1>{title}</h1>
                {subTitle && <h2>{subTitle}</h2>}
                {description && <p style={{ marginBottom: 0 }}>{description}</p>}
            </div>
        </div>
    );
}
