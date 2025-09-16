import React, { useState } from "react";
import Button from "./button";

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    return (
        <div className="p-4 bg-gray-100 rounded">
            <div>Count: {count}</div>
            <Button label="Increment" onClick={() => setCount(count => count+1)} />
            <Button label="Decrement" onClick={() => setCount(count => count-1)} />
            <Button label="Reset" onClick={() => setCount(0)} />
        </div>
    );
}

export default Counter;