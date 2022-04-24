using Newtonsoft.Json.Linq;
using System.ComponentModel;
using System.Reflection;

namespace CV.API.Extensions
{
    public static class EnumExtensions
    {
        public static string ToDescriptionString<TEnum>(this TEnum @enum)
        {
            FieldInfo info = @enum.GetType().GetField(@enum.ToString());
            var attributes = (DescriptionAttribute[])info.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return attributes?[0].Description ?? @enum.ToString();
        }

        public static int ToIntValue(this string number)
        {
            int result = -1;
            int.TryParse(number, out result);
            return result;
        }

        public static int ToInt(this JToken? token)
        {
            int result = 0;
            if (token == null)
            {
                return result;
            }
            else
            {
                int.TryParse(token.ToString(), out result);
                return result;
            }
        }

        public static int ToInt(this string token)
        {
            int result = 0;
            if (token == null)
            {
                return result;
            }
            else
            {
                int.TryParse(token.ToString(), out result);
                return result;
            }
        }

    }
}