"use client";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    CartesianGrid,
} from 'recharts';

// This component renders the customized area chart.
export const FancyAreaChart = () => {
    // Sample data for the area chart.
    const data = [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

    return (
        // ResponsiveContainer ensures the chart adapts to its parent container's size.
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                {/* Define the gradient for the area fill. */}
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5733" stopOpacity={0.8}/>
                        <stop offset="50%" stopColor="#FFC300" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#C70039" stopOpacity={0.4}/>
                    </linearGradient>
                </defs>

                {/* Hide the grid, X and Y axes for a cleaner look */}
                <CartesianGrid stroke="transparent"/>
                <XAxis dataKey="name" tick={{fill: 'transparent'}} stroke="transparent"/>
                <YAxis tick={{fill: 'transparent'}} stroke="transparent"/>

                {/* Tooltip for hover interactions */}
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        borderColor: '#4A5568',
                        color: '#FFFFFF',
                        borderRadius: '0.5rem',
                    }}
                    itemStyle={{color: '#FFFFFF'}}
                />

                {/* The Area component itself, filled with the gradient defined above. */}
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#FF5733"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />

                {/* Custom text element to display "87%" in the center of the chart. */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        fill: 'white',
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    87%
                </text>
            </AreaChart>
        </ResponsiveContainer>
    );
};