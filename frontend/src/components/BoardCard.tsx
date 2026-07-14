import Values from 'values.js'
import { TbXboxX } from "react-icons/tb";

export default function BoardCard( {title, bgColor, taskQuantity}:{title: string, bgColor:string, taskQuantity:number} ) {
    const color = new Values(bgColor)
    const lightBg = color.tint(90).hexString()
    const borderColor = color.tint(60).hexString()
    const fullPalette:Array<string> = color.all(50).map(color=> color.hexString()).slice(1, -1)

    console.log(borderColor)

    return (
        <div className=' cursor-pointer transition-all 200ms hover:-translate-y-1 rounded-xl max-w-100' style={{
            backgroundColor: lightBg,
            border: `1px solid ${borderColor}`,
        }}>

            <div className={`grid grid-cols-3`} >
                {
                    fullPalette.map((color, index)=>{
                        return (
                            <div
                                className={

                                    `${index === 0 && 'rounded-tl-xl'} ${index === 2 && 'rounded-tr-xl'}`
                                }
                                style={{ backgroundColor: color, height: ".5rem" }} key={color}>
                            </div>
                        )
                    })
                }
            </div>
            <div className='px-4 flex justify-between items-center' >
                <p className=' text-xl font-header font-semibold py-2 border-b border-gray-300'>
                    {title}
                </p>
                {/* Delete button */}
                <TbXboxX
                    className='text-red-500 hover:scale-150 transition-all duration-300'
                    size={17.5}/>
            </div>

            <div className='flex items-center justify-between text-gray-600'>

            <p className='px-4 py-2 text-sm'>
                {taskQuantity > 1 ? `${taskQuantity} Tasks` : taskQuantity === 1 ? `1 task` : (`No tasks`)}
            </p>
                <p className='px-4 py-2 text-sm'>
                    Updated 9d Ago
                </p>
            </div>

        </div>

    )
}