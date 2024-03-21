import { Check } from "lucide-react-native"
import { Checkbox, Label, XStack } from "tamagui"

export const CheckBoxAllergens = ({ name, setAllergens, allergens }) => {
    const isChecked = allergens.includes(name)

    const handleChange = (event) => {
        if(event) {
            setAllergens([...allergens, name])
            console.log(allergens)
        } else {
            setAllergens(allergens.filter((allergen) => allergen !== name))
            console.log(allergens)
        }
    }

    return (
        <XStack gap="$3" alignItems="center" >
            <Checkbox  onCheckedChange={handleChange} checked={isChecked}>
                <Checkbox.Indicator>
                    <Check />
                </Checkbox.Indicator>
            </Checkbox>
            <Label htmlFor="unstyled">{name}</Label>
        </XStack >
    )
}