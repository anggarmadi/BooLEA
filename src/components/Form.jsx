function Form({
    fields,
    formData,
    onInputChange,
    onImageChange,
    onSubmit,
    onReset,
    errors,
}) {
    return (
        <form className='space-y-4' onSubmit={onSubmit} onReset={onReset}>
            {fields.map((field, index) => (
                <div key={field.name || index}>
                    <label
                        htmlFor={field.name}
                        className='block text-sm font-medium text-gray-700'
                    >
                        {field.label}
                    </label>
                    {field.type === 'select' ? (
                        <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={onInputChange}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-300'
                        >
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : field.type === 'file' ? (
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            accept='image/*'
                            onChange={onImageChange}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-300'
                        />
                    ) : field.type === 'textarea' ? (
                        <textarea
                            id={field.name}
                            name={field.name}
                            defaultValue={formData[field.name]}
                            onChange={onInputChange}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-300'
                            rows={5}
                        />
                    ) : (
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={onInputChange}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-300'
                        />
                    )}
                    {errors[field.name] && (
                        <span className='text-red-500'>
                            {field.label} {errors[field.name]}
                        </span>
                    )}
                </div>
            ))}
            <div className='flex justify-end space-x-2'>
                <button
                    type='submit'
                    className='px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring'
                >
                    Submit
                </button>
                <button
                    type='reset'
                    className='px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring'
                >
                    Reset
                </button>
            </div>
        </form>
    );
}

export default Form;
