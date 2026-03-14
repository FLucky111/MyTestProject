type Props = {
    title: string;
    text: string;
};

export default function Card({ title, text }: Props) {
    return (
        <div style={{
            border: "1px solid #ddd",
            padding: 20,
            borderRadius: 10,
            marginBottom: 10
        }}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}