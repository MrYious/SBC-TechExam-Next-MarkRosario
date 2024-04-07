import Image from 'next/image';
import iconCross from '../../public/assets/cross.svg'
import { useRouter } from 'next/navigation';

export const NewRecipeButton = () => {
    const router = useRouter();

    const handleCreateNewRecipe = () => {
        router.push('create');
    }

    return (
        <button onClick={handleCreateNewRecipe} className='newRecipeButton'>
            <Image alt='icon cross' src={iconCross} />
        </button>
    )
}