type SkillIconProps = {
    IconComponent: React.ComponentType<{ className?: string }>;
    color?: string;
    size?: string;
};

const SkillIcon: React.FC<SkillIconProps> = ({ IconComponent, color = '#000', size = 'h-8 w-8' }) => {
    return <IconComponent className={`${size} text-[${color}]`} />;
};

export default SkillIcon