import type { AdminUserRowType } from "../types/types";

function AdminUserRow(props: AdminUserRowType) {
    const user = props.user;
    const getDateStr = (date: Date | undefined) => {
        if (!date) return 'N/A';
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };
    try {
        console.log(user);
        return (
            <>
                <tr className="h-8">
                    <td className='border-e-2 border-header dark:border-header-dark text-center ps-2 cursor-pointer'>{user.id}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.type}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.status}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.email}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.nickname}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.desc}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{getDateStr(user.createdAt)}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{getDateStr(user.updatedAt)}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.mutedTo ? getDateStr(user.mutedTo) : 'N/A'}</td>
                    <td className='text-center border-e-2 border-header dark:border-header-dark ps-2'>{user.lastLoginAt ? getDateStr(user.lastLoginAt) : 'N/A'}</td>
                    {/*<td className='text-center'>
                        <button className='mx-2 px-2 py-1/2 bg-green-500 dark:bg-green-600 text-element dark:text-element-dark rounded' onClick={handleEdit}>{`Edit`}</button>
                        <button className='mx-2 px-2 py-1/2 bg-red-500 dark:bg-red-600i text-element dark:text-element-dark rounded' onClick={handleDelete}>{`Delete`}</button>
                    </td>*/}
                </tr>
            </>
        );
    } catch (error) {
        return(<tr>
            <td>{user.id}</td>
            <td>{(error as Error).message}</td>
        </tr>)
    }
    
}

export default AdminUserRow;